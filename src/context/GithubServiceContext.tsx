import { createContext } from "react";
import { GithubService, IGithubService } from "services/github";

const GithubServiceContext = createContext<{
    service: IGithubService
}>({
    service: new GithubService
})

export default GithubServiceContext