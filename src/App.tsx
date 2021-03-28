import React, { useState } from 'react';
import './App.css';
import _ from "lodash";
import GithubServiceContext from 'context/GithubServiceContext';
import { GithubService } from 'services/github';
import List from 'components/List';

function App() {
    const [query, setQuery] = useState<string>("");
    return (
        <GithubServiceContext.Provider value={{ service: new GithubService() }}>
            <div className="App">
                <div style={{ margin: 20 }}>
                    <span>Plz enter some text to search Github repos : </span>
                    <input style={{ width: 300 }} defaultValue={query} onChange={_.debounce(async (e) => {
                        if (e.target.value) {
                            setQuery(e.target.value)
                        }
                    }, 1000)} />
                </div>
                <List query={query} />
            </div>
        </GithubServiceContext.Provider>
    );
}

export default App;
