if (localStorage.getItem('lang') === null) {
  localStorage.setItem('lang', 'en');
}

const keyLayout = [
  { code: 'Backquote', en: '`', ru: 'ё' }, { code: 'Digit1', en: '1', ru: '1' }, { code: 'Digit2', en: '2', ru: '2' }, { code: 'Digit3', en: '3', ru: '3' }, { code: 'Digit4', en: '4', ru: '4' }, { code: 'Digit5', en: '5', ru: '5' }, { code: 'Digit6', en: '6', ru: '6' }, { code: 'Digit7', en: '7', ru: '7' }, { code: 'Digit8', en: '8', ru: '8' }, { code: 'Digit9', en: '9', ru: '9' }, { code: 'Digit0', en: '0', ru: '0' }, { code: 'Minus', en: '-', ru: '-' }, { code: 'Equal', en: '=', ru: '=' }, { code: 'Backspace' }, { code: 'Tab' }, { code: 'KeyQ', en: 'q', ru: 'й' }, { code: 'KeyW', en: 'w', ru: 'ц' }, { code: 'KeyE', en: 'e', ru: 'у' }, { code: 'KeyR', en: 'r', ru: 'к' }, { code: 'KeyT', en: 't', ru: 'е' }, { code: 'KeyY', en: 'y', ru: 'н' }, { code: 'KeyU', en: 'u', ru: 'г' }, { code: 'KeyI', en: 'i', ru: 'ш' }, { code: 'KeyO', en: 'o', ru: 'щ' }, { code: 'KeyP', en: 'p', ru: 'з' }, { code: 'BracketLeft', en: '[', ru: 'х' }, { code: 'BracketRight', en: ']', ru: 'ъ' }, { code: 'Backslash', en: '\\', ru: '\\' }, { code: 'CapsLock' }, { code: 'KeyA', en: 'a', ru: 'ф' }, { code: 'KeyS', en: 's', ru: 'ы' }, { code: 'KeyD', en: 'd', ru: 'в' }, { code: 'KeyF', en: 'f', ru: 'а' }, { code: 'KeyG', en: 'g', ru: 'п' }, { code: 'KeyH', en: 'h', ru: 'р' }, { code: 'KeyJ', en: 'j', ru: 'о' }, { code: 'KeyK', en: 'k', ru: 'л' }, { code: 'KeyL', en: 'l', ru: 'д' }, { code: 'Semicolon', en: ';', ru: 'ж' }, { code: 'Quote', en: "'", ru: 'э' }, { code: 'Enter' }, { code: 'ShiftLeft' }, { code: 'KeyZ', en: 'z', ru: 'я' }, { code: 'KeyX', en: 'x', ru: 'ч' }, { code: 'KeyC', en: 'c', ru: 'с' }, { code: 'KeyV', en: 'v', ru: 'м' }, { code: 'KeyB', en: 'b', ru: 'и' }, { code: 'KeyN', en: 'n', ru: 'т' }, { code: 'KeyM', en: 'm', ru: 'ь' }, { code: 'Comma', en: ',', ru: 'б' }, { code: 'Period', en: '.', ru: 'ю' }, { code: 'Slash', en: '/', ru: '.' }, { code: 'ArrowUp' }, { code: 'ShiftRight' }, { code: 'ControlLeft' }, { code: 'AltLeft' }, { code: 'Space' }, { code: 'AltRight' }, { code: 'ArrowLeft' }, { code: 'ArrowDown' }, { code: 'ArrowRight' }, { code: 'ControlRight' },
];

const Keyboard = {
  elements: {
    textarea: null,
    main: null,
    keysContainer: null,
    keys: [],
  },

  eventHandlers: {
    oninput: null,
  },

  properties: {
    value: '',
    capsLock: false,
  },

  init() {
    this.elements.textarea = document.createElement('textarea');
    this.elements.main = document.createElement('div');
    this.elements.keysContainer = document.createElement('div');
    const description = document.createElement('p');
    description.innerHTML = 'Please press <kbd>Shift</kbd> + <kbd>Alt</kbd> to change language. Keyboard was created in Windows OS.';

    this.elements.textarea.classList.add('use-keyboard-input');
    this.elements.main.classList.add('keyboard');
    this.elements.keysContainer.classList.add('keyboard-keys');
    this.elements.keysContainer.appendChild(this._createKeys());

    this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard-key');

    document.body.appendChild(this.elements.textarea);

    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);

    document.body.appendChild(description);

    document.querySelectorAll('.use-keyboard-input').forEach((elem) => {
      elem.addEventListener('focus', () => {
        this.open(elem.value, (currentValue) => {
          elem.value = currentValue;
        });
      });
    });

    document.querySelectorAll('.keyboard-key:not(.functional)').forEach((btn) => {
      btn.addEventListener('click', () => {
        this.properties.value += this.properties.capsLock ? btn.textContent.toUpperCase() : btn.textContent.toLowerCase();
        this._triggerEvent('oninput');
      });
    });

    this.runOnKeys();
  },

  _createKeys() {
    const fragment = document.createDocumentFragment();

    const createIconHtml = function (iconName) {
      return `<i class="material-icons">${iconName}</i>`;
    };

    keyLayout.forEach((key) => {
      const keyElement = document.createElement('button');
      const insertLineBreak = ['Backspace', 'Backslash', 'Enter', 'ShiftRight'].indexOf(key.code) !== -1;

      keyElement.setAttribute('type', 'button');
      keyElement.setAttribute('data', key.code);
      keyElement.classList.add('keyboard-key');

      switch (key.code) {
        case 'Backspace':
          keyElement.classList.add('keyboard-key--wide', 'functional');
          keyElement.innerHTML = createIconHtml('backspace');

          keyElement.addEventListener('click', () => {
            this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
            this._triggerEvent('oninput');
          });
          break;

        case 'CapsLock':
          keyElement.classList.add('keyboard-key--wide', 'keyboard-key--activatable', 'functional');
          keyElement.innerHTML = createIconHtml('keyboard_capslock');

          keyElement.addEventListener('click', () => {
            this._toggleCapsLock();
            keyElement.classList.toggle('keyboard-key--active', this.properties.capsLock);
          });
          break;

        case 'Enter':
          keyElement.classList.add('keyboard-key--wide', 'functional');
          keyElement.innerHTML = createIconHtml('keyboard_return');

          keyElement.addEventListener('click', () => {
            this.properties.value += '\n';
            this._triggerEvent('oninput');
          });
          break;

        case 'Space':
          keyElement.classList.add('keyboard-key--extra-wide', 'functional');
          keyElement.innerHTML = createIconHtml('space_bar');

          keyElement.addEventListener('click', () => {
            this.properties.value += ' ';
            this._triggerEvent('oninput');
          });
          break;

        case 'Tab':
          keyElement.classList.add('keyboard-key--wide', 'functional');
          keyElement.innerHTML = createIconHtml('keyboard_tab');

          keyElement.addEventListener('click', () => {
            this.properties.value += '  ';
            this._triggerEvent('oninput');
          });
          break;

        case 'ShiftLeft':
        case 'ShiftRight':
          keyElement.classList.add('keyboard-key--wide', 'functional');
          keyElement.innerHTML = createIconHtml('arrow_upward');
          break;

        case 'ControlLeft':
        case 'ControlRight':
          keyElement.classList.add('functional');
          keyElement.innerHTML = '<span>ctrl</span>';
          break;

        case 'AltLeft':
        case 'AltRight':
          keyElement.classList.add('functional');
          keyElement.innerHTML = '<span>alt</span>';
          break;

        case 'ArrowUp':
          keyElement.classList.add('functional');
          keyElement.innerHTML = createIconHtml('keyboard_arrow_up');
          break;

        case 'ArrowRight':
          keyElement.classList.add('functional');
          keyElement.innerHTML = createIconHtml('keyboard_arrow_right');
          break;

        case 'ArrowDown':
          keyElement.classList.add('functional');
          keyElement.innerHTML = createIconHtml('keyboard_arrow_down');
          break;

        case 'ArrowLeft':
          keyElement.classList.add('functional');
          keyElement.innerHTML = createIconHtml('keyboard_arrow_left');
          break;

        default:
          keyElement.textContent = localStorage.getItem('lang') == 'en' ? key.en : key.ru;
      }

      fragment.appendChild(keyElement);

      if (insertLineBreak) {
        fragment.appendChild(document.createElement('br'));
      }
    });


    return fragment;
  },

  _triggerEvent(handlerName) {
    if (typeof this.eventHandlers[handlerName] === 'function') {
      this.eventHandlers[handlerName](this.properties.value);
    }
  },

  _toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;
    for (const key of this.elements.keys) {
      if (key.childElementCount == 0) {
        key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
      }
    }
  },

  _toggleLang() {
    const lang = localStorage.getItem('lang');
    localStorage.setItem('lang', lang == 'en' ? 'ru' : 'en');
    for (let i = 0; i < keyLayout.length; i++) {
      if (this.elements.keys[i].childElementCount == 0) {
        this.elements.keys[i].textContent = lang == 'ru' ? keyLayout[i].en : keyLayout[i].ru;
      }
    }
  },

  open(initialValue, oninput) {
    this.properties.value = initialValue || '';
    this.eventHandlers.oninput = oninput;
  },

  runOnKeys() {
    const codesForChangeLang = ['Shift', 'Alt'];
    const pressed = new Set();

    document.addEventListener('keydown', (event) => {
      document.querySelector(`.keyboard-key[data="${event.code}"]`).classList.add('active');

      pressed.add(event.key);

      for (const code of codesForChangeLang) {
        if (!pressed.has(code)) {
          return;
        }
      }

      pressed.clear();
      this._toggleLang();
    });

    document.addEventListener('keyup', (event) => {
      document.querySelector(`.keyboard-key[data="${event.code}"]`).classList.remove('active');

      pressed.delete(event.key);

      if (event.code == 'CapsLock') {
        this._toggleCapsLock();
        this.elements.keys[28].classList.toggle('keyboard-key--active', this.properties.capsLock);
      }
    });
  },
};

window.addEventListener('DOMContentLoaded', () => {
  Keyboard.init();
});
