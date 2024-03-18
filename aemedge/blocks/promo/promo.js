export default async function decorate(block) {
  const blockChildrens = block.getElementsByTagName('div');
  const buttonElem = blockChildrens.item(3);
  const buttonContainer = buttonElem.getElementsByTagName('p');
  Array.from(buttonContainer).forEach((elem) => {
    elem.classList.add(...['button-container', 'no-margin']);
    const buttonType = elem.firstElementChild;
    const btnClasses = ['button'];
    if (buttonType.tagName === 'EM') {
      btnClasses.push('secondary');
    } else {
      btnClasses.push('primary');
    }
    buttonType.firstElementChild.classList.add(...btnClasses);
  });
}
