import { MetricsComponent } from "./metrics.component";
import { Shallow } from "shallow-render";

describe("MetricsComponent", () => {
  let shallow: Shallow<MetricsComponent>;

  beforeEach(() => {
    shallow = new Shallow(MetricsComponent);
  });

  it("should create MetricsComponent", async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });
});
