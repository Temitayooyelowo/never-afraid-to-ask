package com.example.yizhangcao.neverafraidtoask;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.Spinner;
import android.widget.TextView;

import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import java.util.ArrayList;

public class CourseSelectionActivity extends AppCompatActivity{

    private Spinner courseSelectionsSpinner;

    private Button submitCourse;

    private DatabaseReference mDatabase;

    private String selectedCourse;

    private String[] stringArray;

    @Override
    public void onCreate (Bundle savedBundleState) {
        super.onCreate(savedBundleState);
        setContentView(R.layout.activity_course_selection);

        mDatabase = FirebaseDatabase.getInstance().getReference();

        courseSelectionsSpinner = (Spinner) findViewById(R.id.courseSpinner);

        submitCourse = (Button) findViewById(R.id.submitCourse);

        courseSelectionsSpinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> adapterView, View view, int i, long l) {
                selectedCourse = stringArray[i];
            }

            @Override
            public void onNothingSelected(AdapterView<?> adapterView) {

            }
        });

        mDatabase.child("availableCourses").addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                // This method is called once with the initial value and again
                // whenever data at this location is updated.
                ArrayList<String> contents = new ArrayList<>();
                for(DataSnapshot child: dataSnapshot.getChildren()) {
                    String content = child.getValue(String.class);
                    contents.add(content);
                }
                stringArray = new String[contents.size()];
                stringArray = contents.toArray(stringArray);
                ArrayAdapter<String> adapter = new ArrayAdapter<String>(getApplicationContext(),
                        android.R.layout.simple_spinner_item, stringArray);
                adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
                courseSelectionsSpinner.setAdapter(adapter);
            }

            @Override
            public void onCancelled(DatabaseError error) {
                // Failed to read value
            }
        });

        submitCourse.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (selectedCourse != null) {
                    Intent intent = new Intent(getApplicationContext(), MainActivity.class);
                    intent.putExtra("courseCode", selectedCourse);
                    startActivity(intent);
                }
            }
        });

    }
}
