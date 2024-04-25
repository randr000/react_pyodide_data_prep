

import React from "react";
import { render, screen } from "@testing-library/react";
import FileUpload from "./FileUpload";
import useGetContexts from "../../custom-hooks/useGetContexts";
import DATA_COMPONENT_TYPES from "../../js/dataComponentTypes";

jest.mock("../../custom-hooks/useGetContexts");
const mockUseGetContexts = jest.mocked(useGetContexts);

it('should have file upload drop zone in the document', () => {

    const mockedState = {
        isDragging: false,
        nextID: 1,
        connectComponents: false,
        components: [
            {
                type: DATA_COMPONENT_TYPES.FILE_UPLOAD,
                compID: 0,
                outputComponents: new Set([1])
            }
        ],
        arrows: []
    };

    mockUseGetContexts.mockReturnValue({appState: mockedState, dispatch: jest.fn()});
    
    render(<FileUpload compID={0} cardTitle={"File Upload"} iconClassNames={false}/>)
    const inputElement = screen.getByText("Drag or click to browse");
    expect(inputElement).toBeInTheDocument();
});
