import { useState, useEffect, useCallback } from "react";
import axios, { AxiosError } from "axios";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";
import { toast } from "react-hot-toast";
import styles from "./App.module.css";

interface UnsplashImage {
  id: string;
  alt_description: string;
  urls: {
    small: string;
    regular: string;
  };
  user: {
    name: string;
  };
  likes: number;
}

interface UnsplashApiResponse {
  results: UnsplashImage[];
  total_pages: number;
}

const App = () => {
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>("");
  const [modalImage, setModalImage] = useState<UnsplashImage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(1);

  const fetchImages = useCallback(
    async (searchQuery: string, pageNumber: number) => {
      if (!searchQuery) return;

      setLoading(true);
      setError(null);

      try {
        const response = await axios.get<UnsplashApiResponse>(
          "https://api.unsplash.com/search/photos",
          {
            params: { query: searchQuery, page: pageNumber, per_page: 12 },
            headers: {
              Authorization: `Client-ID ${
                import.meta.env.VITE_UNSPLASH_API_KEY
              }`,
            },
          }
        );

        setImages((prev) =>
          pageNumber === 1
            ? response.data.results
            : [...prev, ...response.data.results]
        );
        setTotalPages(response.data.total_pages);
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          console.error(
            "Axios error while fetching images:",
            error.response?.data || error.message
          );
        } else if (error instanceof Error) {
          console.error("General error:", error.message);
        } else {
          console.error("Unknown error:", error);
        }

        setError("Failed to fetch images. Please try again later.");
        toast.error("Failed to fetch images.");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    if (query) {
      fetchImages(query, page);
    }
  }, [query, page, fetchImages]);

  const handleSearch = (newQuery: string) => {
    if (newQuery !== query) {
      setQuery(newQuery);
      setPage(1);
      setImages([]);
    }
  };

  const openModal = (image: UnsplashImage) => {
    setModalImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage(null);
  };

  return (
    <div className={styles.app}>
      <SearchBar onSubmit={handleSearch} />
      {error && <ErrorMessage message={error} />}
      <div className={styles.galleryContainer}>
        <ImageGallery images={images} onImageClick={openModal} />
      </div>
      {loading && <Loader />}
      {images.length > 0 && page < totalPages && !loading && (
        <LoadMoreBtn onClick={() => setPage((prev) => prev + 1)} />
      )}
      {modalImage && (
        <ImageModal
          isOpen={isModalOpen}
          image={modalImage}
          onRequestClose={closeModal}
        />
      )}
    </div>
  );
};

export default App;
