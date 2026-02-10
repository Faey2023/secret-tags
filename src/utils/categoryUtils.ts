export type TMeasurementSystem = "CLOTHING_ALPHA" | "CLOTHING_NUMERIC" | "UPPER_BODY_SIZE" | "CUP_SIZE" | "WEIGHT_KG" | "LENGTH_CM";

const measurementSystemOptions = Object.freeze([
    { value: "CLOTHING_ALPHA", label: "Clothing (M, L, XL)" },
    { value: "CLOTHING_NUMERIC", label: "Clothing (32, 34, 36, 38, 40, 42, 44, 46)" },
    { value: "UPPER_BODY_SIZE", label: "Cup Size (28A, 30B, 32C, 34D)" },
    { value: "CUP_SIZE", label: "Cup Size (S, M, L)" },
    { value: "WEIGHT_KG", label: "Weight (kg)" },
    { value: "LENGTH_CM", label: "Length (cm)" }
]);

const generateCategoryMeasurements = (categoryMeasurementSystem: TMeasurementSystem) => {
    switch (categoryMeasurementSystem) {
        case "CLOTHING_ALPHA":
            return ["XS", "S", "M", "L", "XL", "XXL", "XXXL", "OneSize"];
        case "CLOTHING_NUMERIC":
            return [28, 30, 32, 34, 36, 38, 40, 42, 44, 46];
        case "UPPER_BODY_SIZE":
            return ["28AA", "28A", "28B", "28C", "28D",
                "30AA", "30A", "30B", "30C", "30D",
                "32AA", "32A", "32B", "32C", "32D",
                "34AA", "34A", "34B", "34C", "34D",
                "36AA", "36A", "36B", "36C", "36D",
                "38A", "38B", "38C", "38D",
                "40B", "40C", "40D",
                "42C", "42D",
                "44D"];
        case "CUP_SIZE":
            return ["S", "M", "L"];
        case "WEIGHT_KG":
            return Array.from({ length: 5 }, (_, i) => i);
        case "LENGTH_CM":
            return Array.from({ length: 5 }, (_, i) => i);
        default:
            return [];
    }
};

export { generateCategoryMeasurements, measurementSystemOptions };