import React from "react";
import { render, screen, act, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { ThemeProvider } from "../context/ThemeContext";
import FeelingLuckyButton from "../components/ui/FeelingLuckyButton";

describe("FeelingLuckyButton Component Suite", () => {
  beforeEach(() => {
    sessionStorage.clear();
    vi.useFakeTimers();
  });

  it("does not render immediately, but appears after 5 seconds", () => {
    render(
      <ThemeProvider>
        <FeelingLuckyButton />
      </ThemeProvider>
    );

    expect(screen.queryByText(/Feeling Lucky\?/i)).toBeNull();

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(screen.getByText(/Feeling Lucky\?/i)).not.toBeNull();
  });

  it("does not render if already clicked in current session", () => {
    sessionStorage.setItem("benjaminsz_feeling_lucky_clicked", "true");

    render(
      <ThemeProvider>
        <FeelingLuckyButton />
      </ThemeProvider>
    );

    act(() => {
      vi.advanceTimersByTime(6000);
    });

    expect(screen.queryByText(/Feeling Lucky\?/i)).toBeNull();
  });

  it("switches theme and hides button when clicked", () => {
    render(
      <ThemeProvider>
        <FeelingLuckyButton />
      </ThemeProvider>
    );

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    const button = screen.getByRole("button", { name: /Feeling Lucky\?/i });
    expect(button).not.toBeNull();

    act(() => {
      fireEvent.click(button);
    });

    expect(sessionStorage.getItem("benjaminsz_feeling_lucky_clicked")).toBe("true");
    expect(screen.queryByText(/Feeling Lucky\?/i)).toBeNull();
  });
});
