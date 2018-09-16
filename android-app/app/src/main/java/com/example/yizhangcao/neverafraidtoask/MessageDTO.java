package com.example.yizhangcao.neverafraidtoask;

import com.google.firebase.database.Exclude;

import java.util.HashMap;
import java.util.Map;

public class MessageDTO {
    private String content;
    private String courseCode;
    private String userId;
    private Long timeStemp;

    public MessageDTO() {
    }

    public MessageDTO(String content, String courseCode, String userId) {
        this.content = content;
        this.courseCode = courseCode;
        this.userId = userId;
        this.timeStemp = System.currentTimeMillis();
    }

    @Exclude
    public Map<String, Object> toMap() {
        HashMap<String, Object> result = new HashMap<>();
        result.put("content", content);
        result.put("courseCode", courseCode);
        result.put("timeStemp", timeStemp);
        result.put("userId", userId);

        return result;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getCourseCode() {
        return courseCode;
    }

    public void setCourseCode(String courseCode) {
        this.courseCode = courseCode;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public Long getTimeStemp() {
        return timeStemp;
    }
}
