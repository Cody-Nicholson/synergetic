import {task} from 'gulp';
import {DIST_ROOT} from './constants';
import {cleanTask} from './helpers';


task('clean', cleanTask(DIST_ROOT));
