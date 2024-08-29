import { describe, expect, test } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import UpvoteList from '../features/UpvoteList/UpvoteList'

describe("UpvoteList", () => {
  test("Selects upvote button", () => {
    const component = render(<UpvoteList initialState={[
      {
        id: "0",
        elements: [{
          id: "test-button",
          selected: false
        }]
      }
    ]} />)

    const testButton = component.container.querySelector<HTMLElement>("#test-button")
    fireEvent.click(testButton!)
    expect(testButton!.classList.contains('selected')).toBeTruthy();
  })
})