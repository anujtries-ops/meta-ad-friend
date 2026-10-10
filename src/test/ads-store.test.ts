import { describe, expect, it, afterEach } from "vitest";
import { actions, useAds } from "@/lib/ads-store";
import { renderHook, act } from "@testing-library/react";

afterEach(() => actions.reset());

describe("Campaign image previews", () => {
  it("preserves the uploaded creative when creating a campaign", () => {
    const { result } = renderHook(() => useAds(s => s));
    const source = result.current.campaigns[0];
    if (!source) throw new Error("Missing demo campaign");
    const image = "data:image/png;base64,uploaded_photo";
    let id = "";
    act(() => { id = actions.createCampaign({ ...source, ad: { ...source.ad, image } }); });
    expect(result.current.campaigns.find(c => c.id === id)?.ad.image).toBe(image);
  });

  it("preserves the same photo when duplicating a campaign", () => {
    const { result } = renderHook(() => useAds(s => s));
    const source = result.current.campaigns[0];
    if (!source) throw new Error("Missing demo campaign");
    const image = "data:image/png;base64,uploaded_duplicate_photo";
    let id: string | undefined;
    act(() => { actions.updateCampaign(source.id, { ad: { ...source.ad, image } }); id = actions.duplicateCampaign(source.id); });
    expect(result.current.campaigns.find(c => c.id === id)?.ad.image).toBe(image);
  });
});