import './App.css';
import {BrowserRouter, Switch, Route } from 'react-router-dom';
import ListAssignment from './components/ListAssignment';
import GradeAssignment from './components/GradeAssignment';
import AddReview from './components/AddReview';
import EditReview from './components/EditReview';
import Login from './components/Login';
import ListMedia from './components/ListMedia';

function App() {
  return (
    <div className="App">
      <img src="https://i.imgur.com/R9xWvkZ.png" height={130} alt="Under Review"></img>
      <BrowserRouter>
          <div>
            <Switch>
              <Route exact path="/" component={ListMedia} />
              <Route path="/listAssignment" component={ListAssignment} />
              <Route path="/gradeAssignment" component={GradeAssignment} />
              <Route path="/addReview" component={AddReview} />
              <Route path="/editReview" component={EditReview}/>
              <Route render={ () => <h1>Page not found</h1>} />
            </Switch>
          </div>
        </BrowserRouter>
    </div>
  );
}

export default App;
