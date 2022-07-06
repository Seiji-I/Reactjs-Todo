import React from 'react';
import './Todo.css'

export default class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      inputItem: "",
      index: 0
    }
    // binding methods
    this.updateInputItem = this.updateInputItem.bind(this)
    this.updateItems = this.updateItems.bind(this)
    this.removeItem = this.removeItem.bind(this)
    this.editItem = this.editItem.bind(this)
    this.editDone = this.editDone.bind(this)
    this.editCancel = this.editCancel.bind(this)
  }
  render() {
    return (
      <div>
        <h1>Todo app</h1>
        <div className='container'>
        <form onSubmit={this.updateItems}>
          <label>
            Item Name: 
            <input type="text"
              value={this.state.inputItem}
              onChange={this.updateInputItem} 
              placeholder="What are you going to do?"
              className='item-text'
            />
          </label>
          
          <button className='btn btn-primary'>Regest Item</button>
        </form>
        <table className='container'>
          <tbody>
            <tr>
              <th>Item</th>
            </tr>
          {this.state.items.map((item) =>
            <tr key={item.index} className="item-row">
              <td className='item-name'>
                {item.item}
              </td>
              <td className='col-1'>
                { (item.isEdit === false) ? 
                (
                  <input type="button"
                    className="btn btn-success" 
                    value="Edit"
                    onClick={(event) => {
                    this.editItem(event)
                  }}
                />) : (
                  <div>
                    <label
                    className="edit-label"
                    onClick={(event) => {
                      this.editDone(event)
                    }}
                    >Done
                    </label>
                    <label
                    className='edit-label'
                    onClick={(event) => {
                      this.editCancel(event)
                    }}
                    >Cancel
                    </label>
                  </div>
                )
                }
              </td>
              <td className='col-2'>
                <input type="button"
                  className="btn btn-danger"
                  value="Delete" 
                  onClick={() => {
                    this.removeItem(item.index)
                  }}
                />
              </td>
            </tr>
          )}
          </tbody>
        </table>
        </div>
      </div>
    )
  }
  updateInputItem(event) {
    this.setState({
      inputItem: event.target.value
    });
  }
  updateItems(event) {
    event.preventDefault();
    this.setState({
      index: this.state.index+1
    })
    this.setState({
      items: [
        ...this.state.items, 
        {
          index: this.state.index,
          item: this.state.inputItem,
          isEdit: false
        }
      ]
    });
    // console.log(this.state.items)
  }
  removeItem(index) {
    for (let i=0; i<this.state.items.length; i++) {
      if (this.state.items[i].index === index) {
        this.state.items.splice(i, 1)
        this.setState({items: this.state.items})
      }
    }
  }
  editItem(event){
    let pel = event.target.parentElement.parentElement
    let ei = pel.querySelector("td")
    let eit = ei.innerText.toString()
    eit = eit.replace(/'/g, `\'`)
    console.log(eit)
    ei.innerHTML = `<input type="text" value="${eit}" />`
    let items = this.state.items;
    items[pel.rowIndex-1].isEdit = true;
    console.log(items)
    this.setState({items: items})
  }
  editDone(event) {
    let pel = event.target.parentElement.parentElement.parentElement
    let ei = pel.querySelector("td")
    let eit = ei.querySelector("input").value.replace(/ /g, "\u00a0")
    eit = eit.replace(/'/g, "\u0027")
    ei.innerHTML = `${eit}`
    let items = this.state.items;
    items[pel.rowIndex-1].item = eit;
    items[pel.rowIndex-1].isEdit = false;
    console.log(items)
    this.setState({items: items})
  }
  editCancel(event) {
    let pel = event.target.parentElement.parentElement.parentElement
    let ei = pel.querySelector("td")
    let items = this.state.items;
    items[pel.rowIndex-1].isEdit = false;
    ei.innerHTML = items[pel.rowIndex-1].item
    console.log(items)
    this.setState({items: items})
  }
}