export class ContactInfo {
  id: string;
  name: string;
  email: string;
  avatarURL: string;
}

export class RootObject {
  contacts: ContactInfo[];
}