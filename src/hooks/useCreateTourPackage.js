import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { createTourPackage } from "../apis/apiTour";

export default function useCreateTourPackage() {

    const createItinerary = (dayNumber) => ({
        dayNumber,
        title: "",
        description: "",
    });
    const [form, setForm] = useState({
        name: "",
        description: "",
        durationDays: 1,
        durationNights: 0,
        price: "",
        location: "",
        images: [],
        itineraries: [
            createItinerary(1)
        ],
    });

    const navigate = useNavigate()
    const { fetchWithAuth } = useAuth()
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        const { value, name, files } = e.target

        if (name === "images") {
            const newImages = Array.from(files);

            setForm((prev) => ({
                ...prev,
                images: [...prev.images, ...newImages],
            }));

            return;
        }

        if (name == "durationDays") {
            setForm((prev) => {
                const nextForm = {
                    ...prev,
                    durationDays: value
                }
                const days = Number(value)

                if (
                    value === "" ||
                    !Number.isInteger(days) ||
                    days < 1 ||
                    days > 30
                ) {
                    return nextForm;
                }

                const itineraries = Array.from({ length: days }, (_, index) => (
                    prev.itineraries[index] ?? createItinerary(index + 1)
                )).map((item, index) => ({
                    ...item,
                    dayNumber: index + 1
                }))
                return {
                    ...nextForm,
                    itineraries,
                };
            })
            return;
        }
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleItineraryChange = (index, field, value) => {
        setForm((prev) => ({
            ...prev,
            itineraries: prev.itineraries.map((item, i) =>
                i === index
                    ? { ...item, [field]: value }
                    : item
            ),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError(null)
        setLoading(true)

        const formData = new FormData()

        try {
            formData.append("name", form.name);
            formData.append("description", form.description);
            formData.append("durationDays", form.durationDays);
            formData.append("durationNights", form.durationNights);
            formData.append("price", form.price);
            formData.append("location", form.location);

            form.images.forEach(image => {

                if (image instanceof File) {
                    formData.append("images", image);
                }
            })

            form.itineraries.forEach((itinerary, index) => {
                formData.append(`itineraries[${index}].dayNumber`, itinerary.dayNumber);
                formData.append(`itineraries[${index}].title`, itinerary.title);
                formData.append(`itineraries[${index}].description`, itinerary.description);
            })

            const result = await createTourPackage(fetchWithAuth, formData)

            if (result) {
                navigate("/admin/tours")
            }
        } catch (error) {
            setError(error.message)
        }
        finally {
            setLoading(false);
        }
    }

    return {
        form,
        setForm,
        handleChange,
        handleItineraryChange,
        handleSubmit,
        error,
        loading,
    };
}