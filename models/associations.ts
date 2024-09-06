import { User } from './User';
import Animal from './Animal';
import Species from './Species';
import AnimalsHasUsers from './AnimalsHasUsers';
import AnimalsPictures from './AnimalsPictures';
import Message from './Message';
import FosterlingProfile from './FosterlingProfile';
import UsersPicture from './UsersPicture';
import FosterlingRequest from './FosterlingRequest';

// Définir les associations

// User -> Animals (1:N)
User.hasMany(Animal, {
  foreignKey: 'creator_id',
  as: 'createdAnimals',
});
Animal.belongsTo(User, {
  foreignKey: 'creator_id',
  as: 'creator',
});

// Species -> Animals (1:N)
Species.hasMany(Animal, {
  foreignKey: 'species_id',
  as: 'animals',
});
Animal.belongsTo(Species, {
  foreignKey: 'species_id',
  as: 'species',
});

// Animals -> AnimalsHasUsers (1:N)
Animal.hasMany(AnimalsHasUsers, {
  foreignKey: 'animals_id',
  as: 'animalOwners',
});
AnimalsHasUsers.belongsTo(Animal, {
  foreignKey: 'animals_id',
  as: 'animal',
});

// Users -> AnimalsHasUsers (1:N)
User.hasMany(AnimalsHasUsers, {
  foreignKey: 'users_id',
  as: 'userAnimals',
});
AnimalsHasUsers.belongsTo(User, {
  foreignKey: 'users_id',
  as: 'user',
});

// Animals -> AnimalsPictures (1:N)
Animal.hasMany(AnimalsPictures, {
  foreignKey: 'animals_id',
  as: 'pictures',
});
AnimalsPictures.belongsTo(Animal, {
  foreignKey: 'animals_id',
  as: 'animal',
});

// Users -> Messages (1:N) (as sender)
User.hasMany(Message, {
  foreignKey: 'sender_id',
  as: 'sentMessages',
});
Message.belongsTo(User, {
  foreignKey: 'sender_id',
  as: 'sender',
});

// Users -> Messages (1:N) (as receiver)
User.hasMany(Message, {
  foreignKey: 'receiver_id',
  as: 'receivedMessages',
});
Message.belongsTo(User, {
  foreignKey: 'receiver_id',
  as: 'receiver',
});

// Users -> FosterlingProfiles (1:N)
User.hasMany(FosterlingProfile, {
  foreignKey: 'users_id',
  as: 'fosterlingProfiles',
});
FosterlingProfile.belongsTo(User, {
  foreignKey: 'users_id',
  as: 'user',
});

// Species -> FosterlingProfiles (1:N)
Species.hasMany(FosterlingProfile, {
  foreignKey: 'species_id',
  as: 'fosterlingProfiles',
});
FosterlingProfile.belongsTo(Species, {
  foreignKey: 'species_id',
  as: 'species',
});

// Users -> UsersPictures (1:N)
User.hasMany(UsersPicture, {
  foreignKey: 'users_id',
  as: 'pictures',
});
UsersPicture.belongsTo(User, {
  foreignKey: 'users_id',
  as: 'user',
});

// Animals -> FosterlingRequests (1:N)
Animal.hasMany(FosterlingRequest, {
  foreignKey: 'animals_id',
  as: 'fosterlingRequests',
});
FosterlingRequest.belongsTo(Animal, {
  foreignKey: 'animals_id',
  as: 'animal',
});

// Users -> FosterlingRequests (1:N)
User.hasMany(FosterlingRequest, {
  foreignKey: 'users_id',
  as: 'fosterlingRequests',
});
FosterlingRequest.belongsTo(User, {
  foreignKey: 'users_id',
  as: 'user',
});

// Additional associations go here
export {
  User,
  Animal,
  Species,
  AnimalsHasUsers,
  AnimalsPictures,
  Message,
  FosterlingProfile,
  UsersPicture,
  FosterlingRequest,
};
