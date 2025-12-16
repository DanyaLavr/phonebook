import { schema } from "normalizr";
export const callsEntity = new schema.Entity("calls");
export const contactsEntity = new schema.Entity("contacts", {
  calls: [callsEntity],
});
