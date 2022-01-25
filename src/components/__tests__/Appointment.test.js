import React from "react";

import { render, cleanup } from "@testing-library/react";

import Appointments from "components/Appointments";

afterEach(cleanup);
describe("Appointments()" , ()=> {

  it("renders without crashing", () => {
    render(<Appointments />);
  });

})

