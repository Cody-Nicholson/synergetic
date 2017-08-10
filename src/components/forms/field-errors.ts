
export const DefaultFieldErrors = {
    required: "This is a required field.",
    invalidInteger: "This field must be an integer.",
    invalidUrl: "Field must be a valid Url.",
    minLength: getMinIntMessage,
    minimumInteger: getMinLengthMessage
};

export function getMinIntMessage(error: any){
    return `Input field must be an integer over ${error.requiredLength}.`
}

export function getMinLengthMessage(error: any){
    return `Input field must be at least ${error.requiredLength} characters in length`;

}
