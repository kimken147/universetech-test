import { FC } from "react";
import { Item } from "services/github";

interface Props {
    repoItem: Item
}

const RepoItem: FC<Props> = ({ repoItem }) => {
    return (
        <div className="repo-item">
            <ul>
                <li>Full name: {repoItem.full_name}</li>
                <li>Private: {repoItem.private ? "true" : "false"}</li>
                <li>
                    Owner:
                    <div>
                        <div>Url: {repoItem.owner.url}</div>
                        <div>Type: {repoItem.owner.type}</div>
                    </div>
                </li>
                <li>Watchers: {repoItem.watchers}</li>
                <li>Score: {repoItem.score}</li>
                <li>Forks count: {repoItem.forks_count}</li>
            </ul>
        </div>
    )
}

export default RepoItem