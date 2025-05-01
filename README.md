## **Accès aux pages**

- **Lien pour accèder au portfolio (pour le public)** : [http://localhost/](http://localhost/)
- **Lien pour accèder à la partie admin** : [http://localhost/admin/login](http://localhost/admin/login)

---

## **Pré-requis installation projet**

➡️ **Se placer à la racine du projet** avant toute commande :

- Se créer un jeton d'accès personnel avec les accès suivants :
    - data.records:read
    - data.records:write

 
- Créer un .env dans le dossier frontend/ et mettre : 
``
    NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
``


- Créer un .env dans le dossier backend/ et mettre : 
``
    AIRTABLE_PERSONAL_TOKEN=METTRE_LE_TOKEN_CREE_PLUS_HAUT
``
``
    AIRTABLE_BASE_ID=appZ8WVg10DOpVw6X
``
``
    JWT_SECRET=esgi-portfolio-secret-2025-hema
``

➡️ **Se placer à la racine du projet** faire les commandes suivantes :

```bash
cd chemin/vers/project-1-airtable/backend
```

```bash
npm i
```

**Ensuite**

```bash
cd ../frontend
```

```bash
npm i
```

docker compose up


### Technologies utilisées

- Nestjs
- Nextjs
- TailwindCSS
