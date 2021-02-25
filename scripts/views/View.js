class View {

    constructor(container) {
        this._container = container;
    }

    template() {
        
        throw new Error("Method template() must be implemented.");
        
    }

    update(model) {
        this._container.innerHTML = this.template(model);
    }
     
}