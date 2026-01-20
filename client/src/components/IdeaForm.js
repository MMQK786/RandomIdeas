import IdeasApi from "../services/ideasAPI";
import IdeaList from "./IdeaList";

class IdeaForm {
  constructor() {
    this.formModal = document.querySelector("#form-modal");
    // this._form = document.querySelector('#idea-form')
    this._form = null;
    this._list = new IdeaList();

    //we get an error can not read properties of null reading addEventListener
    //this is because the item doesnt exist yet, as we arent rendering from index.html anymore
    //we are now rendering from javascript
    //so we could actually just add it like above, or add it under where we render
  }

  addEventListeners() {
    this._form.addEventListener("submit", this.handleSubmit.bind(this)); //we have to bind, since we are on an event listner on a callback
    //otherwise this will refer to class
  }

  async handleSubmit(e) {
    e.preventDefault();

    if (
      !this._form.elements.text.value ||
      !this._form.elements.tag.value ||
      !this._form.username.value
    ) {
      alert("please enter all field");
      return;
    }

    //Save user to local storage

    localStorage.setItem('username', this._form.elements.username.value)

    const idea = {
      text: this._form.elements.text.value,
      tag: this._form.elements.tag.value,
      username: this._form.elements.username.value,
    };

    //add idea to server
    const newidea = await IdeasApi.createIdea(idea);
    this._list.addIdeaToList(newidea.data.data);
    //add idea to list
    // this._list.render()

    console.log("jere");
    //clear fields
    this._form.elements.text.value = "";
    this._form.elements.username.value = "";
    this._form.elements.tag.value = "";
    //in order to close the modal, since the modal has no link here, we will dispatch an event
    //that the modal can listen to


    document.dispatchEvent(new Event("closemodal"));
    //now we need to listen to this event in the modal class
    //allows component interaction in vanilla JS
  }

  //here we plan to insert the html, from the Javascript
  render() {
    //will output the html
    //we also want to grab the form, so that we can listen to a submit
    this.formModal.innerHTML = ` 
    <form id="idea-form">
          <div class="form-control">
            <label for="idea-text">Enter a Username</label>
            <input type="text" name="username" id="username" value="${localStorage.getItem('username') ? localStorage.getItem('username') : ''}" />
          </div>
          <div class="form-control">
            <label for="idea-text">What's Your Idea?</label>
            <textarea name="text" id="idea-text"></textarea>
          </div>
          <div class="form-control">
            <label for="tag">Tag</label>
            <input type="text" name="tag" id="tag" />
          </div>
         
          <button class="btn" type="submit" id="submit">Submit</button>
        </form>`;

    this._form = document.querySelector("#idea-form");
    this.addEventListeners();
  }
}

export default IdeaForm;
