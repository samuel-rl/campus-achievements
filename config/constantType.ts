export interface Course {
    uid: string;
	enseignants: BasicUserInfos[];
	nom: string;
	skills: any;
    etudiants: BasicUserInfos[];
    color: string;
}

export interface User {
    uid: string;
    annee: string | null;
    filiere: string | null;
    nom: string;
    prenom: string;
    etudiant: boolean;
    token: string;
    avatar: string;
}

export interface BasicUserInfos {
    uid: string | null | undefined;
    displayName: string | null | undefined;
    token: string;
    avatar: string | null | undefined;
}


export interface Quizz {
	question: string;
	propositions: string[];
	solution: string;
}

export interface Skill {
	nom: string;
	autoEvaluate: boolean;
	isSoftSkill: boolean;
	quizz: Quizz[] | null;
}