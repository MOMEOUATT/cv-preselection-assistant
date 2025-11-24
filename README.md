## 📄 README.md

# 🧠 CV Preselection Assistant

Une plateforme intelligente pour la gestion des candidatures et des offres d’emploi, avec parsing automatique des compétences, authentification sécurisée, et architecture extensible.



## 📂 Structure du projet

cv-preselection-assistant/
├── backend/    # Spring Boot (API REST, sécurité JWT, parsing)
├── frontend/   # Angular (UI moderne, filtrage, affichage conditionnel)
└── README.md   # Documentation du projet

---

## 🚀 Fonctionnalités principales
- 🔐 Authentification sécurisée avec Spring Security + JWT
- 🧬 Architecture multi-rôles (`Candidate`, `Recruiter`)
- 📄 Parsing automatique des compétences depuis les CV
- 🧭 Frontend Angular moderne (Material, Signals, Computed)
- 🔍 Recherche et filtrage combiné des offres (mot-clé + statut)

---

## 🛠️ Technologies utilisées
- **Backend** : Java 17+, Spring Boot, Spring Security, JWT, Maven
- **Frontend** : Angular 17+, Angular Material
- **Base de données** : MySQL

---

## 📦 Installation

### Backend
cd backend
mvn clean install
mvn spring-boot:run

### Frontend
cd frontend
npm install
ng serve

---

## 🔐 Configuration des secrets

### Étape 1 : Copier le fichier d’exemple
Un fichier `application.properties.example` est fourni dans `backend/src/main/resources/`.

Copiez-le pour créer votre propre configuration locale :
cp src/main/resources/application.properties.example src/main/resources/application.properties

### Étape 2 : Remplir vos valeurs
Modifiez `application.properties` avec vos informations :
- **Base de données** : URL, utilisateur, mot de passe
- **JWT** : secret et durée d’expiration
- **Port serveur** : si besoin

### Étape 3 : Sécurité
Le fichier `application.properties` est **exclu du dépôt** via `.gitignore`.  
👉 Vous ne devez jamais pousser vos secrets sur GitHub.

---


## 🤝 Contribuer
Les PR sont les bienvenues ! Merci de suivre les conventions de commit et de documenter vos ajouts.

---

## 📄 Licence
MIT
