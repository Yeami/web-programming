import _ from 'lodash';

import 'bootstrap/dist/css/bootstrap.min.css';

import './styles.scss';
import './styles.less';

import { getHeader } from './components/header/header';
import { getContent } from './components/main/main';
import { getFooter } from './components/footer/footer';

const app = document.querySelector('#app');

app.classList.add('d-flex', 'flex-column');
app.innerHTML = getHeader() + getContent() + getFooter();
