import _ from 'lodash';
import './styles.scss';
import './styles.less';

function component() {
  const element = document.createElement('div');

  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('hello');
  element.setAttribute('id', 'title');

  return element;
}

document.body.appendChild(component());