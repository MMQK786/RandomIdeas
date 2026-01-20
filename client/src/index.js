// import "@fortawesome/fontawesome-free/css/all.css";
import "./style.css";

import Modal from "./components/Modal.js";
import IdeaForm from "./components/IdeaForm.js";
import IdeaList from "./components/IdeaList.js";

new Modal();

const ideaForm = new IdeaForm();
ideaForm.render();

new IdeaList();
