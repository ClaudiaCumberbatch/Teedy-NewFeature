package com.sismics.docs.core.util;

import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;

import org.checkerframework.checker.units.qual.s;

import java.io.InputStreamReader;
import java.io.BufferedReader;
import java.io.OutputStream;

public class TranslateUtil {
    private static final String API_URL = "https://api.mymemory.translated.net/get";

    public static String translate(String text, String targetLang) throws Exception {
        System.out.println("Translating text: " + text + " to language: " + targetLang);
        // 简易使用 MyMemory 免费翻译 API（或可替换为其他服务如 Google Translate）
        String encodedText = URLEncoder.encode(text, "UTF-8");
        // String urlStr = API_URL + "?q=" + encodedText + "&langpair=en|" + targetLang;
        String urlStr = API_URL + "?q=" + encodedText + "&langpair=zh-cn|en";
        System.out.println("Request URL: " + urlStr);

        URL url = new URL(urlStr);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");

        try (BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()))) {
            String inputLine;
            StringBuilder result = new StringBuilder();
            while ((inputLine = in.readLine()) != null) {
                System.out.println("Response: " + inputLine);
                result.append(inputLine);
            }

            // 提取翻译文本（这里简化处理）
            String raw = result.toString();
            int idxStart = raw.indexOf("\"translatedText\":\"") + 18;
            int idxEnd = raw.indexOf("\"", idxStart);
            return raw.substring(idxStart, idxEnd);
        }
    }
}