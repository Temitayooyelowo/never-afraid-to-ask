package com.example.yizhangcao.neverafraidtoask;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;

public class FirstPage extends AppCompatActivity {

    private Button mSignInButton;
    private Button mSignUpButton;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_first_page);
        mSignInButton = (Button) findViewById(R.id.sign_in);

        mSignInButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                startActivity(new Intent(getApplicationContext(), SignInActivity.class));
                finish();
            }
        });
    }
}
