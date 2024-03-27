import { makeAutoObservable } from 'mobx';

class UserStore {
    userEmail = '';
    userName = '';

    constructor() {
        makeAutoObservable(this);
    }

    setUserEmail(email: string) {
        this.userEmail = email;
    }

    setUserName(name: string) {
        this.userName = name;
    }
}

export const userStore = new UserStore();

