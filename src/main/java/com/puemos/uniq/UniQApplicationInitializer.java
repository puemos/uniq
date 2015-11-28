package com.puemos.uniq;

import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.web.SpringBootServletInitializer;

public class UniQApplicationInitializer extends SpringBootServletInitializer {

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		application.sources(UniQApplication.class);
		return super.configure(application);
	}
	
}
