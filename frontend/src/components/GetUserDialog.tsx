import type { FormEvent } from "react";
import type { StateType, UserType } from "../types";
import { v4 as uuid } from "uuid";
import { toast } from "sonner";

const GetUserDialog: React.FC<{
  user: UserType;
  setState: React.Dispatch<React.SetStateAction<StateType>>;
}> = ({ user, setState }) => {
  const onUsernameFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username");
    const userId = uuid();
    if (!username || username === "")
      return toast.error("Please enter your username");

    setState((prevState: StateType) => {
      return { ...prevState, user: { username: username.toString(), userId } };
    });
  };

  return (
    <dialog id="my_modal_1" className="modal" open={user.userId === ""}>
      <form className="modal-box w-80" onSubmit={onUsernameFormSubmit}>
        <h3 className="font-bold text-lg">Please enter your username</h3>
        <input type="text" className="input mt-3" name="username" />
        <div className="modal-action">
          <button className="btn" type="submit">
            Submit
          </button>
        </div>
      </form>
    </dialog>
  );
};

export default GetUserDialog;
