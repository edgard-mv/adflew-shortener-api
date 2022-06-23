import { DB_URI } from "../constants";
import { connect } from "mongoose";

const dbConnect = () => {
  if (!DB_URI) {
    console.error("Make sure to set DB_URI");
    process.exit(1);
  }
  connect(DB_URI, (error) => {
    if (error) {
      console.error(
        "Something went wrong when connecting to the database",
        error
      );
    }
  });
};

export default dbConnect;
