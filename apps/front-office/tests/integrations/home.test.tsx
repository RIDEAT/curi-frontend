import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../../app/page";

describe("Home 컴포넌트 테스트", () => {
  test("Back Office 버튼이 렌더링되는지 확인", () => {
    render(<Home />);
    const backButton = screen.getByText("Front Office");
    expect(backButton).toBeInTheDocument();
  });
});
