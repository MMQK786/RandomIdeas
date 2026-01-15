class Modal {
  constructor() {
    this._modal = document.querySelector("#modal");
    this._modalBtn = document.querySelector("#modal-btn");
    // this._btnRemove = document.querySelector("#btn-remove");
    this.addEventListeners();
  }

  addEventListeners() {
    //when using a this keyword inside a class method and on event listner
    // this will point to the event that it was called on, so we need to bind
    window.addEventListener("click", this.outsideClick.bind(this));
    // this._btnRemove.addEventListener("click", this.close.bind(this));
    this._modalBtn.addEventListener("click", this.open.bind(this));

    document.addEventListener('closemodal',  this.close.bind(this))
    //closemodal is are on custom made dispatched event which we created in IdeaForm
  }

  open() {
    this._modal.style.display = "block";
  }

  close(e) {
    // e.preventDefault();
    this._modal.style.display = "none";
  }

  outsideClick(e) {
    if (e.target === this._modal) {
      this.close();
    }
  }
}

export default Modal;
