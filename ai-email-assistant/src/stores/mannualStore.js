import { makeObservable, observable, action, runInAction } from "mobx";
import axios from "../config/axios";
import toast from "react-hot-toast";

class ManualStore {
  manuals = [];

  constructor() {
    makeObservable(this, {
      manuals: observable,
      uploadManual: action,
      fetchManuals: action,
      deleteManual: action,
      renameManual: action,
    });
  }

  uploadManual = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("filename", file.name);

      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (userInfo?.email) {
        formData.append("email", userInfo.email);
      } else {
        throw new Error("User email not found in localStorage");
      }

      const response = await axios.post("/api/manuals/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      runInAction(() => {
        this.manuals = [...this.manuals, response.data];
      });

      toast.success("Manual uploaded successfully!");
      this.fetchManuals();
      return response.data;
    } catch (error) {
      console.error("Error uploading manual:", error);
      toast.error(
        error.response?.status === 409
          ? "A manual with this filename already exists."
          : error.response?.data?.message || "Failed to upload manual"
      );
      throw error;
    }
  };

  fetchManuals = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const email = userInfo?.email;

      if (!email) throw new Error("User email not found in localStorage");

      const response = await axios.get(`/api/list-manuals/?email=${email}`);

      runInAction(() => {
        this.manuals = response.data.manuals;
      });
    } catch (error) {
      console.error("Error fetching manuals:", error);
      toast.error("Failed to fetch manuals");
    }
  };

  deleteManual = async (manualId) => {
    try {
      await axios.delete(`/api/delete-manual/${manualId}/`);

      runInAction(() => {
        this.manuals = this.manuals.filter((manual) => manual.id !== manualId);
      });

      toast.success("Manual deleted successfully!");
    } catch (error) {
      console.error("Error deleting manual:", error);
      toast.error("Failed to delete manual");
    }
  };

  renameManual = async (id, newFilename) => {
    try {
      const response = await axios.patch(`/api/rename-manual/${id}/`, {
        filename: newFilename,
      });

      runInAction(() => {
        this.manuals = this.manuals.map((manual) =>
          manual.id === id ? { ...manual, filename: newFilename } : manual
        );
      });

      toast.success("Filename updated!");
    } catch (error) {
      toast.error("Failed to rename manual");
      console.error("Rename error:", error);
    }
  };
}

const manualStore = new ManualStore();
export default manualStore;
