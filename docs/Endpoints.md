# API Routes

## User

```typescript
interface User {
  id: number; // Clé primaire avec auto-incrémentation et unique
  type_user: string; // Rôle d'utilisateur
  name: string; // Nom d'utilisateur
  description?: string; // Texte de présentation utilisateur
  email: string;
  password: number;
  country: string;
  zip: number;
  city: string;
  longitude: number;
  latitude: number;
  phone?: string;
  address?: string;
  website?: string;
  created_at: Date;
  updated_at: Date;
}
```

| Method | Route      | Request Body                                                                                                          | Response Body | Code (success) |
| ------ | ---------- | --------------------------------------------------------------------------------------------------------------------- | ------------- | -------------- |
| GET    | /users     |                                                                                                                       | []User        | 200            |
| GET    | /users/:id |                                                                                                                       | User          | 200            |
| POST   | /users     | {type_user: , name: , email: , password: , country: , zip: , city: , description?: , phone?: , address?: , website?:} | Created User  | 201            |
| PUT    | /users/:id | {type_user: , name: , email: , password: , country: , zip: , city: , description?: , phone?: , address?: , website?:} | Updated User  | 200            |
| DELETE | /users/:id |                                                                                                                       |               | 204            |

```typescript
interface Message {
  id: number; // Clé primaire avec auto-incrémentation et unique
  sender_id: number; // Référence à users.id pour l'expéditeur
  receiver_id: number; // Référence à users.id pour le destinataire
  content: string; // Contenu du message
  created_at: Date; // Date de création du message
  updated_at: Date; // Date de dernière mise à jour du message
}
```

Messagerie
| Method | Route | Request Body | Response Body | Code (success) |
| ------ | ------------------- | -------------------------------------- | -------------- | -------------- |
| GET | /users/:id/messages | | []Message | 200 |
| POST | /messages | {sender_id: , receiver_id: , content:} | Sended Message | 201 |

## Animals

```typescript
interface Animal {
  id: number; // Clé primaire avec auto-incrémentation et unique
  name: string; // Nom de l'animal
  date_of_birth: Date; // Date de naissance de l'animal
  sexe: string; // Sexe de l'animal
  race?: string; // Race de l'animal
  short_story?: string; // Histoire courte, peut être null
  long_story?: string; // Histoire longue, peut être null
  health?: string; // État de santé, peut être null
  species_id: number; // Référence à species.id
  creator_id: number; // Référence à users.id
  created_at: Date; // Date de création
  updated_at: Date; // Date de dernière mise à jour
}
```

| Method | Route        | Request Body                                                                                                    | Response Body  | Code (success) |
| ------ | ------------ | --------------------------------------------------------------------------------------------------------------- | -------------- | -------------- |
| GET    | /animals     |                                                                                                                 | []Animal       | 200            |
| GET    | /animals/:id |                                                                                                                 | Animal         | 200            |
| POST   | /animals     | {name: , date_of_birth: , sexe: , race?: , short_story?: , long_story?: , health?: , species_id: ; creator_id:} | Created Animal | 201            |
| PUT    | /animals/:id | {name: , date_of_birth: , sexe: , race?: , short_story?: , long_story?: , health?: , species_id: ; creator_id:} | Updated Animal | 200            |
| DELETE | /animals/:id |                                                                                                                 |                | 204            |

Animals fostered by one User
| Method | Route | Request Body | Response Body | Code (success) |
| ------ | ------------------ | ------------ | ------------- | -------------- |
| GET | /users/:id/animals | | []Animal | 200 |

## Fosterling Profiles

```typescript
interface FosterlingProfile {
  id: number; // Clé primaire avec auto-incrémentation et unique
  quantity: number; // Quantité (nombre d'animaux)
  age?: string; // Âge, peut être null
  sexe?: string; // Sexe, peut être null (caractère unique, par exemple 'M' ou 'F')
  search_area?: number; // Zone de recherche, peut être null
  users_id: number; // Référence à users.id (utilisateur associé)
  species_id: number; // Référence à species.id (espèce associée)
  created_at: Date; // Date de création
  updated_at: Date; // Date de dernière mise à jour
}
```

| Method | Route         | Request Body                                                          | Response Body             | Code (success) |
| ------ | ------------- | --------------------------------------------------------------------- | ------------------------- | -------------- |
| GET    | /profiles     |                                                                       | []FosterlingProfile       | 200            |
| GET    | /profiles/:id |                                                                       | FosterlingProfile         | 200            |
| POST   | /profiles     | {species_id: , quantity: , users_id:, age?: , sexe?: , search_area?:} | Created FosterlingProfile | 201            |
| PUT    | /profiles/:id | {species_id: , quantity: , users_id:, age?: , sexe?: , search_area?:} | Updated FosterlingProfile | 200            |
| DELETE | /profiles/:id |                                                                       |                           | 204            |

**Note** : La route **GET /profiles** ne servirait uniquement pour un usage administrateur.

Current User's Fosterling Profiles
| Method | Route | Request Body | Response Body | Code (success) |
| ------ | ------------------ | ------------ | ------------------- | -------------- |
| GET | /users/:id/profils | | []FosterlingProfile | 200 |

## Fosterling Requests

```typescript
interface FosterlingRequest {
  id: number; // Clé primaire avec auto-incrémentation et unique
  request_status: string; // Statut de la demande (par exemple, 'pending', 'approved', 'rejected')
  animals_id: number; // Référence à animals.id (identifiant de l'animal concerné)
  users_id: number; // Référence à users.id (utilisateur qui a fait la demande)
  content_request?: string; // Précisions concernant la demande
  created_at: number; // Timestamp de la date de création
  updated_at: number; // Timestamp de la date de dernière mise à jour
}
```

| Method | Route         | Request Body                                 | Response Body             | Code (success) |
| ------ | ------------- | -------------------------------------------- | ------------------------- | -------------- |
| GET    | /requests     |                                              | []FosterlingRequest       | 200            |
| POST   | /requests     | {animals_id: , users_id:, content_request?:} | Created FosterlingRequest | 201            |
| PATCH  | /requests/:id | {content_request?:}                          | Updated FosterlingRequest | 200            |
| DELETE | /requests/:id |                                              |                           | 204            |

**Note** : Le route **GET /requests** ne servirait uniquement pour un usage administrateur.

Current User's Requests
| Method | Route | Request Body | Response Body | Code (success) |
| ------ | ------------------- | ------------ | ------------------- | -------------- |
| GET | /users/:id/requests | | []FosterlingRequest | 200 |
