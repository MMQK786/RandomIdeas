import IdeasApi from "../services/ideasAPI";

class IdeaList {
  constructor() {
    this._ideaListEl = document.querySelector("#idea-list");
    //which basically mean everything under it will render in the component

    this._ideas = [];

    this.getIdeas();

    this._validTags = new Set();
    this._validTags.add("technology");
    this._validTags.add("business");
    this._validTags.add("software");
    this._validTags.add("education");
    this._validTags.add("health");
    this._validTags.add("inventions");

    // this.addEventListeners();
  }

  addEventListeners() {
    //we will do event delegation, we will add the listener to the entire list, but only target the icon

    this._ideaListEl.addEventListener("click", async (e) => {
      const i = e.target.closest("i");
      if (!i) return;
      const idea = i.closest(".card");
      console.log(idea);
      const ideaId = idea.dataset.id; //we get the idea here

      try {
        //or just have a function that runs this
        this.deleteIdea(ideaId);
        // idea.remove();
        return;
      } catch (error) {
        console.log(error);
      }
    });

    // this._ideaListEl.addEventListener('click', (e) => {
    //     if(e.target.classList.contains('fa-times')) {

    //         // e.stopImmediatePropagation(); //since the whole card is clickable, this prevents it from it being done more than on
    //         e.stopPropagation();
    //         console.log('check')

    //     }
    // })
  }

  async deleteIdea(ideaId) {
    try {
      const res = await IdeasApi.deleteIdea(ideaId);
      this._ideas.filter((idea) => idea.id !== ideaId);
      this.getIdeas(); //in which it will re render
    } catch (error) {
      alert("you can not delete this resource");
    }
  }

  async getIdeas() {
    try {
      const res = await IdeasApi.getIdeas();
      //  res.json({ success: true, data: ideas }); this is the response of our api
      this._ideas = res.data.data; //the first data is the axios method of accessing, the second is our data param
      this.render();
      console.log(this._ideas);
    } catch (error) {
      console.log(error);
    }
  }

  addIdeaToList(idea) {
    this._ideas.push(idea);
    this.render();
  }

  getTagClass(tag) {
    tag = tag.toLowerCase();
    console.log(tag);
    let tagClass = "";
    if (this._validTags.has(tag)) {
      tagClass = `tag-${tag}`;
    } else {
      tagClass = "";
    }
    return tagClass;
  }

  //now we want to render the list
  render() {
    // _id - we do underscore id, because thats how mongo db saves it in database
    this._ideaListEl.innerHTML = this._ideas
    .map((idea) => {
          const deleteButton = localStorage.getItem('username') === idea.username ?  '<button class="delete"><i class="fas fa-times"></i></button>' : ''
        return `
         <div class="card" data-id="${idea._id}">
         ${deleteButton}
          <h3>
            ${idea.text}
          </h3>
          <p class="tag ${this.getTagClass(
            idea.tag
          )}">${idea.tag.toUpperCase()}</p>
          <p>
            Posted on <span class="date">${idea.date}</span> by
            <span class="author">${idea.username}</span>
          </p>
        </div>`;
      })
      .join(""); //joins the strings together and glues them together
    //.join connverts an array to strings cleanly

    this.addEventListeners();
  }
}

export default IdeaList;
