import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "./redux/slices/cartSlice";

const artworks = [
    {
        id: 1,
        title: "Come Home Fast",
        size: `44" x 72"`,
        medium: "Mixed media on stretched canvas",
        price: 3200,
    },
    {
        id: 2,
        title: "Incongruent Messages",
        size: `48" x 60"`,
        medium: "Mixed media on stretched canvas",
        price: 3400,
    },
    {
        id: 3,
        title: "Sleeping Boy",
        size: `48" x 72"`,
        medium: "Mixed media on stretched canvas",
        price: 3100,
    },
    {
        id: 4,
        title: "I'm Not Going To Land",
        size: `48" x 48"`,
        medium: "Mixed media on stretched canvas",
        price: 2200,
    },
    {
        id: 5,
        title: "Looking Everywhere",
        size: `48" x 48"`,
        medium: "Mixed media on stretched canvas",
        price: 2100,
    },
    {
        id: 6,
        title: "Getting Home",
        size: `40" x 50"`,
        medium: "Mixed media on stretched canvas",
        price: null,
        nfs: true,
    },
    {
        id: 7,
        title: "Light of St. Vincent",
        size: `72" x 44"`,
        medium: "Mixed media on stretched canvas",
        price: 3200,
    },
    {
        id: 8,
        title: "The Weight of Seeing",
        size: `48" x 24"`,
        medium: "Mixed media on stretched canvas",
        price: 1200,
    },
    {
        id: 9,
        title: "Discussion About Trees",
        size: `Diptych 30" x 60"`,
        medium: "Mixed media on stretched canvas",
        price: 1700,
    },
    {
        id: 10,
        title: "Letter Home",
        size: `30" x 40"`,
        medium: "Mixed media on stretched canvas",
        price: 1200,
    },
    {
        id: 11,
        title: "Near Miss",
        size: `30" x 40"`,
        medium: "Mixed media on stretched canvas",
        price: 1200,
    },
    {
        id: 12,
        title: "The Real Reason",
        size: `40" x 30"`,
        medium: "Mixed media on stretched canvas",
        price: 1200,
    },
    {
        id: 13,
        title: "Already Always There",
        size: `40" x 30"`,
        medium: "Mixed media on stretched canvas",
        price: 1200,
    },
    {
        id: 14,
        title: "I Wonder What Happens",
        size: `30" x 24"`,
        medium: "Mixed media on wood panel",
        price: 740,
    },
    {
        id: 15,
        title: "There Are Moments of Clarity",
        size: `30" x 40"`,
        medium: "Mixed media on wood panel",
        price: 740,
    },
    {
        id: 16,
        title: "In the Underworld",
        size: `24" x 24"`,
        medium: "Mixed media on wood panel",
        price: 800,
    },
    {
        id: 17,
        title: "Dance In the Desert",
        size: `36" x 33"`,
        medium: "Mixed media on stretched canvas",
        price: 1200,
    },
    {
        id: 18,
        title: "Floating Not Falling",
        size: `36" x 33"`,
        medium: "Mixed media on stretched canvas",
        price: 1200,
    },
    {
        id: 19,
        title: "Felix Considers Love",
        size: `30" x 30"`,
        medium: "Mixed media on wood panel",
        price: 900,
    },
    {
        id: 20,
        title: "Floating Beyond Stories",
        size: `48" x 24"`,
        medium: "Acrylic on canvas",
        price: 1200,
    },
    {
        id: 21,
        title: "Looking for the Crucial Point",
        size: `48" x 36"`,
        medium: "Mixed media on stretched canvas",
        price: 1700,
    },
    {
        id: 22,
        title: "Never Enough",
        size: `48" x 24"`,
        medium: "Mixed media on canvas",
        price: 1100,
    },
    {
        id: 23,
        title: "John Wayne Kept Them Out",
        size: `48" x 24"`,
        medium: "Mixed media on stretched canvas",
        price: 1200,
    },
];

export default function WorksSection() {
    const dispatch = useDispatch();

    return (
        <div>Store</div>
    );
}