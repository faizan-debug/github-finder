import React, {useContext, useState} from 'react'
import GithubContext from '../../context/gitub/githubContext'
import AlertContext from '../../context/alert/alertContext'

const Search = () => {
    const githubContext = useContext(GithubContext);
    const alertContext = useContext(AlertContext);

    const [text, setText] = useState ('');

const onChange = e => setText (e.target.value);

const onSubmit = e => {
    e.preventDefault();
    if (text === '') {
        alertContext.setAlert('Please enter a username', 'Light')
    } else {
        githubContext.searchUsers(text);
        setText('');
    }
   
}

    return (
      <div>
          <form onSubmit={onSubmit} className="form">

          <input type="text" name="text" placeholder="Search Users"
                value={text}
                onChange={onChange}
                   
                />
            <input type="submit" value="Search" className="btn btn-dark btn-block" />
            </form>
            {githubContext.users.length > 0 && (
            <button onClick={githubContext.clearUsers} className="btn btn-light btn-block">Clear</button>
            )}
      </div>
    )
  }

export default Search
