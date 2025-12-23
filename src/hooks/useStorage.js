export const useStorage = () => {
  const getter = () => JSON.parse(localStorage.getItem("contacts")) ?? [];
  const setter = (contacts) =>
    localStorage.setItem("contacts", JSON.stringify(contacts));
  return [getter, setter];
};
