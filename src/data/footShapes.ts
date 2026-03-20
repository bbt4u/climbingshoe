import { FootShape } from "@/lib/types";

export const footShapeInfo: Record<FootShape, { label: string; desc: string }> = {
  egyptian: {
    label: "Egyptian",
    desc: "Big toe longest, tapering diagonal line. Best with asymmetric shoes that follow the natural taper.",
  },
  roman: {
    label: "Roman",
    desc: "First three toes similar length, squared front. Best with wider toe box shoes that don't compress toes.",
  },
  greek: {
    label: "Greek",
    desc: "Second toe extends past big toe. Best with shoes that have extra room in the toe box peak.",
  },
  german: {
    label: "German",
    desc: "Big toe longest, other four similar length. Best with shoes offering a roomy, square-shaped toe box.",
  },
  celtic: {
    label: "Celtic",
    desc: "Second toe longest with uneven profile. Best with flexible shoes that adapt to irregular toe lengths.",
  },
};

/** Relative toe heights for each foot shape, used by FootShapeIcon */
export const toeHeights: Record<FootShape, number[]> = {
  egyptian: [44, 38, 32, 26, 20],
  roman: [40, 40, 40, 30, 22],
  greek: [36, 44, 34, 26, 20],
  german: [44, 32, 32, 32, 32],
  celtic: [34, 44, 40, 28, 22],
};
