export const ALWAYS = 'always';
export const DISABLED = 'disabled';
export const OUTSIDECLICK = 'outsideClick';
export const NONINPUT = 'nonInput';

import { DropdownDirective } from './dropdown.directive';


export class DropdownService {
  protected openScope:DropdownDirective;

  protected closeDropdownBind:EventListener = this.closeDropdown.bind(this);
  protected keybindFilterBind:EventListener = this.keybindFilter.bind(this);

  public open(dropdownScope:DropdownDirective):void {
    if (!this.openScope) {
      window.document.addEventListener('click', this.closeDropdownBind, true);
      window.document.addEventListener('keydown', this.keybindFilterBind);
    }

    if (this.openScope && this.openScope !== dropdownScope) {
      this.openScope.isOpen = false;
    }

    this.openScope = dropdownScope;
  }

  public close(dropdownScope:DropdownDirective):void {
    if (this.openScope !== dropdownScope) {
      return;
    }

    this.openScope = null;
    window.document.removeEventListener('click', this.closeDropdownBind, true);
    window.document.removeEventListener('keydown', this.keybindFilterBind);
  }

  protected closeDropdown(event:MouseEvent):void {
    if (!this.openScope) {
      return;
    }

    if (event && this.openScope.autoClose === DISABLED) {
      return;
    }

    if (event && this.openScope.toggleEl &&
      this.openScope.toggleEl.nativeElement.contains(event.target)) {
      return;
    }

    if (event && this.openScope.autoClose === NONINPUT &&
      this.openScope.menuEl &&
      /input|textarea/i.test((event.target as any).tagName) &&
      this.openScope.menuEl.nativeElement.contains(event.target)) {
      return;
    }

    if (event && this.openScope.autoClose === OUTSIDECLICK &&
      this.openScope.menuEl &&
      this.openScope.menuEl.nativeElement.contains(event.target)) {
      return;
    }

    this.openScope.isOpen = false;
  }

  protected keybindFilter(event:KeyboardEvent):void {
    if (event.which === 27) {
      this.openScope.focusToggleElement();
      this.closeDropdown(undefined);
      return;
    }

    if (this.openScope.keyboardNav && this.openScope.isOpen &&
      (event.which === 38 || event.which === 40)) {
      event.preventDefault();
      event.stopPropagation();
      this.openScope.focusDropdownEntry(event.which);
    }
  }
}

export let dropdownService = new DropdownService();
