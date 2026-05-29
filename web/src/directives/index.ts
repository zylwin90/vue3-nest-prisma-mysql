import type { App } from 'vue';

import elFocus from './modules/elFocus';
import integer from './modules/integer';
import digit from './modules/digit';
import trim from './modules/trim';
import clickOutside from './modules/clickOutside';
import auth from './modules/auth';
import lettersNumber from './modules/lettersNumber';
import positiveNumber from './modules/positiveNumber';
import limit from './modules/limit';
import alphanumericCn from './modules/alphanumericCn';
import noEmoji from './modules/noEmoji';
import onlyChineseLetterSpace from './modules/onlyChineseLetterSpace';

const directivesList: { [key: string]: any } = {
    elFocus,
    integer,
    digit,
    trim,
    clickOutside,
    auth,
    lettersNumber,
    positiveNumber,
    limit,
    alphanumericCn,
    noEmoji,
    onlyChineseLetterSpace
};

const directives = {
    install: function (app: App) {
        Object.keys(directivesList).forEach(key => {
            app.directive(key, directivesList[key]);
        });
    },
};

export default directives;
