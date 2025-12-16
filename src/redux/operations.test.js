import axios from "axios";
import { addContact, deleteContact, fetchContacts } from "./operations";

jest.mock("axios");
const contact = { id: "1", name: "Ann", number: "123-123-123" };
const thunkAPI = { rejectWithValue: jest.fn() };
const dispatch = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

describe("fetchContacts", () => {
  test("fecthContacts success", async () => {
    axios.get.mockResolvedValue({ data: [contact] });

    const result = await fetchContacts()(dispatch, thunkAPI);

    expect(axios.get).toHaveBeenCalledWith("/contacts");
    expect(result.payload).toEqual([contact]);
  });
  test("fecthContacts error", async () => {
    axios.get.mockRejectedValue(new Error("Error 404"));

    const res = await fetchContacts()(dispatch, thunkAPI);

    expect(axios.get).toHaveBeenCalledWith("/contacts");
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(res.payload).toBe("Error 404");
  });
});

describe("addContact", () => {
  test("addContact success", async () => {
    axios.post.mockResolvedValue({ data: contact });

    const res = await addContact(contact)(dispatch, thunkAPI);

    expect(axios.post).toHaveBeenCalledWith("/contacts", contact);
    expect(res.payload).toEqual(contact);
  });

  test("addContact error", async () => {
    axios.post.mockRejectedValue(new Error("Contact wasn't added"));

    const res = await addContact(contact)(dispatch, thunkAPI);

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith("/contacts", contact);
    expect(res.payload).toBe("Contact wasn't added");
  });
});
describe("deleteContact", () => {
  test("deleteContact success", async () => {
    axios.delete.mockResolvedValue({ data: contact });

    const res = await deleteContact(contact.id)(dispatch, thunkAPI);

    expect(axios.delete).toHaveBeenCalledWith(`/contacts/${contact.id}`);
    expect(res.payload.id).toEqual(contact.id);
  });

  test("deleteContact error", async () => {
    axios.delete.mockRejectedValue(new Error("Contact wasn't deleted"));

    const res = await deleteContact(contact.id)(dispatch, thunkAPI);

    expect(axios.delete).toHaveBeenCalledTimes(1);
    expect(axios.delete).toHaveBeenCalledWith(`/contacts/${contact.id}`);
    expect(res.payload).toBe("Contact wasn't deleted");
  });
});
