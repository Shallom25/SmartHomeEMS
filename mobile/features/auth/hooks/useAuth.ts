import { useCallback, useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import axios from "axios";

const API_URL = process.env.EXPO_PUBLIC_API_URL;



const useResgister = () => {
    return {}
}

const useLogin = () => {
    return{}
};

const useForgotPassword = () => {
    return{}
};

export { useResgister, useLogin, useForgotPassword}