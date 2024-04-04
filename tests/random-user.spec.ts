import { expect, test } from "@playwright/test";

// const user = buildUser();

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.describe("Random user", () => {
  test("random user card generated", async ({ page }) => {
    await expect(page.getByRole("main")).toContainText("Данных нету");
    await page.getByRole("button", { name: "Get random user" }).click();
    await expect(
      page.getByRole("heading", { name: "Данные пользователя" }),
    ).toBeVisible();
  });
});
