class IdeaList {
  constructor() {
    this._ideaListEl = document.querySelector("#idea-list");
    //which basically mean everything under it will render in the component

    this._ideas = [
      {
        id: 1,
        text: "idea 1",
        tag: "business",
        username: "john",
        date: "02/01/2023",
      },
      {
        id: 2,
        text: "idea 2",
        tag: "software",
        username: "hey",
        date: "10/10/2010",
      },
    ];

    this._validTags = new Set();
    this._validTags.add("technology");
    this._validTags.add("business");
    this._validTags.add("software");
    this._validTags.add("education");
    this._validTags.add("health");
    this._validTags.add("inventions");
  }

  getTagClass(tag) {
    tag = tag.toLowerCase();
    console.log(tag)
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
    this._ideaListEl.innerHTML = this._ideas
      .map((idea) => {
        return `
         <div class="card">
          <button class="delete"><i class="fas fa-times"></i></button>
          <h3>
            ${idea.text}
          </h3>
          <p class="tag ${this.getTagClass(idea.tag)}">${idea.tag.toUpperCase()}</p>
          <p>
            Posted on <span class="date">${idea.date}</span> by
            <span class="author">${idea.username}</span>
          </p>
        </div>`;
      })
      .join(""); //joins the strings together and glues them together
    //.join connverts an array to strings cleanly
  }
}

export default IdeaList;
