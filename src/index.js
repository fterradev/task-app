import React from "react";
import ReactDOM from "react-dom";
import { DragDropContext } from "react-beautiful-dnd";
import "@atlaskit/css-reset";
import initialData from "./initial-data";
import Column from "./column";

class App extends React.Component {
  state = initialData;

  onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const sourceColumn = this.state.columns[source.droppableId];
    const destinationColumn = this.state.columns[destination.droppableId];
    const newColumns = {
      ...this.state.columns,
      [sourceColumn.id]: { ...sourceColumn },
      [destinationColumn.id]: { ...destinationColumn },
    };
    newColumns[sourceColumn.id].taskIds.splice(source.index, 1);
    newColumns[destinationColumn.id].taskIds.splice(
      destination.index,
      0,
      draggableId
    );
    this.setState({
      columns: newColumns,
    });
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        {this.state.columnOrder.map((columnId) => {
          const column = this.state.columns[columnId];
          const tasks = column.taskIds.map(
            (taskId) => this.state.tasks[taskId]
          );

          return <Column key={column.id} column={column} tasks={tasks} />;
        })}
      </DragDropContext>
    );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
