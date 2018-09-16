package com.example.yizhangcao.neverafraidtoask;

import android.content.Intent;
import android.os.Message;
import android.support.design.widget.FloatingActionButton;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.JsonReader;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.ScrollView;
import android.widget.TextView;
import android.widget.Toast;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import org.json.JSONObject;
import org.w3c.dom.Text;

import java.util.ArrayList;
import java.util.HashMap;

public class MainActivity extends AppCompatActivity {

    private static final String TAG = "MainActivity";

    private FirebaseAuth mFirebaseAuth;
    private FirebaseUser mFirebaseUser;

    private FloatingActionButton mLogout;

    private Button mSendButton;
    private Button mExtraButton;

    private EditText mQuestionField;

    private LinearLayout chatLayout;

    private ScrollView scrollView;

    private String mUsername;
    private String mPhotoUrl;
    private String mPostKey;

    private DatabaseReference mDatabase;

    public static final String ANONYMOUS = "anonymous";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mFirebaseAuth = FirebaseAuth.getInstance();
        mFirebaseUser = mFirebaseAuth.getCurrentUser();

        mSendButton = (Button) findViewById(R.id.sendButton);
        mExtraButton = (Button) findViewById(R.id.extraButton);

        mQuestionField = (EditText) findViewById(R.id.questionField);

        mLogout = (FloatingActionButton) findViewById(R.id.logout);

        chatLayout = (LinearLayout) findViewById(R.id.chatLayout);

        scrollView = (ScrollView) findViewById(R.id.scrollView);

        mDatabase = FirebaseDatabase.getInstance().getReference();

        if (mFirebaseUser == null) {
            // Not signed in, launch the Sign In activity
            startActivity(new Intent(this, FirstPage.class));
            finish();
            return;
        } else {
            mUsername = mFirebaseUser.getDisplayName();
            if (mFirebaseUser.getPhotoUrl() != null) {
                mPhotoUrl = mFirebaseUser.getPhotoUrl().toString();
            }
        }

        mSendButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (mQuestionField.getText().toString().trim().length() != 0) {
                    writeToDatabase(mQuestionField.getText().toString(), "TestCourse", mFirebaseUser.getUid());
                    mQuestionField.setText("");
                }
                scrollView.postDelayed(new Runnable() {
                    @Override
                    public void run() {
                        //replace this line to scroll up or down
                        scrollView.fullScroll(ScrollView.FOCUS_DOWN);
                    }
                }, 100L);
            }
        });

        mLogout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                mFirebaseAuth.signOut();
                mUsername = ANONYMOUS;
                startActivity(new Intent(getApplicationContext(), FirstPage.class));
                finish();
            }
        });

        mDatabase.child("messages").addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                // This method is called once with the initial value and again
                // whenever data at this location is updated.
                ArrayList<String> contents = new ArrayList<>();
                for(DataSnapshot child: dataSnapshot.getChildren()) {
                    String content = child.child("content").getValue(String.class);
                    TextView textView = new TextView(getApplicationContext());
                    textView.setLayoutParams(new LinearLayout.LayoutParams(LinearLayout.LayoutParams.WRAP_CONTENT, LinearLayout.LayoutParams.WRAP_CONTENT, 1.0f));
                    textView.setText(content);
                    chatLayout.addView(textView);
                }
                // MessageDTO value = dataSnapshot.getValue(MessageDTO.class);
                System.out.println("Hello WOrld");
            }

            @Override
            public void onCancelled(DatabaseError error) {
                // Failed to read value
            }
        });
    }

    private void writeToDatabase(String content, String courseCode, String userId) {
        MessageDTO msg = new MessageDTO(content, courseCode, userId);
        mDatabase.child("messages").push().setValue(msg);
    }

}
